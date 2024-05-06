import {Static, Type} from "@sinclair/typebox"
import {Value} from "@sinclair/typebox/value"
import {Abort, getContext} from "telefunc";
import {getXataClient} from "@/db/xata.server";
import {H3Event} from "h3";

const ProfileValidator = Type.Object({
  name: Type.String({minLength: 2}),
  second_name: Type.Optional(Type.String()),
  lastname: Type.String({minLength: 2}),
  second_lastname: Type.Optional(Type.String()),
  birth_date: Type.Date(),
  gender: Type.Union([
    Type.Literal("M"),
    Type.Literal("F"),
  ]),
  phone: Type.String(),
})

export type ProfileValidatorType = Static<typeof ProfileValidator>;

export async function onCompleteProfile(values: ProfileValidatorType) {
  const context = getContext<H3Event>();
  if (!Value.Check(ProfileValidator, values)) {
    return {
      error: "Invalid values",
    }
  }
  console.log("Profile completed", values);

  const xata = getXataClient();
  try {
    await xata.db.patient_profiles.create({user_id: context.context.user?.uid, ...values});
  } catch (e) {
    console.error("Error creating profile", e);
    return {
      error: "Error creating profile",
    }
  }
  return {
    status: "ok",
  }
}