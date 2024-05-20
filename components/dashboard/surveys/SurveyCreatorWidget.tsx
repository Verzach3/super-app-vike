import { useState } from "react";
import type { ICreatorOptions } from "survey-creator-core";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SurveyCreatorReact = require("survey-creator-react");
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import type { onSaveSurvey } from "@/pages/dashboard/surveys/edit/@id/SurveySave.telefunc";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const { SurveyCreatorComponent, SurveyCreator } = SurveyCreatorReact;

const defaultCreatorOptions: ICreatorOptions = {
	showLogicTab: true,
	showTranslationTab: true,
};

export default function SurveyCreatorWidget(props: {
	json?: any;
	id: string;
	options?: ICreatorOptions;
	onSaveSurvey: typeof onSaveSurvey;
}) {
	let [creator, setCreator] = useState<any>();

	if (!creator) {
		creator = new SurveyCreator(props.options || defaultCreatorOptions);
		creator.saveSurveyFunc = (
			no: number,
			callback: (num: number, status: boolean) => void,
		) => {
			props.onSaveSurvey(creator?.JSON, props.id).then(() => {
				notifications.show({
					title: "Encuesta guardada",
					message: "La encuesta ha sido guardada exitosamente",
					color: "blue",
					icon: <IconCheck />,
				});
			});
			callback(no, true);
		};
		setCreator(creator);
	}

	creator.JSON = props.json || {};

	return <SurveyCreatorComponent creator={creator} />;
}
