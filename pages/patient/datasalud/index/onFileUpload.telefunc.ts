import type { ContextVariableMap } from "hono";
import { getContext } from "telefunc";

export async function onFileUpload(file: string, filename: string) {
	const { webdav, user } = getContext<ContextVariableMap>();
	if (!user) {
		console.log("no user");
		return { error: 401 };
	}
	// remove "data:*/*;base64," if present
	const fileContent = file.split(",")[1]
	console.log(fileContent.slice(0, 100));
	// convert from base64 to file
	const fileBuffer = Buffer.from(fileContent, "base64");
	// upload file to webdav
	await webdav.putFileContents(`/${user.uid}/${filename}`, fileBuffer, {
		overwrite: true,
	});
}
