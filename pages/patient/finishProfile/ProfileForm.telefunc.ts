import { type Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { Abort, getContext } from "telefunc";
import { getXataClient } from "@/db/xata.server";
import type { ContextVariableMap } from "hono";
import { redirect } from "vike/abort";

const ProfileValidator = Type.Object({
	name: Type.String({ minLength: 2 }),
	second_name: Type.Optional(Type.String()),
	lastname: Type.String({ minLength: 2 }),
	second_lastname: Type.Optional(Type.String()),
	birth_date: Type.Date(),
	gender: Type.Union([Type.Literal("M"), Type.Literal("F")]),
	phone: Type.String(),
});

export type ProfileValidatorType = Static<typeof ProfileValidator>;

export async function onCompleteProfile(values: ProfileValidatorType) {
	const context = getContext<ContextVariableMap>();
	if (!Value.Check(ProfileValidator, values)) {
		return {
			error: "Invalid values",
		};
	}
	console.log("Profile completed", values);

	if (context.user?.uid === undefined) {
		return {
			error: "You must be logged in to complete your profile",
		};
	}

	const xata = getXataClient();
	try {
		await xata.db.patient_profiles.create({
			user_id: context.user?.uid,
			...values,
		});
	} catch (e) {
		console.error("Error creating profile", e);
		return {
			error: "Error creating profile",
		};
	}
	return {
		status: "ok",
	};
}
