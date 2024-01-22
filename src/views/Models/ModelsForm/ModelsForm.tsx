import SteppedForm from "@/components/SteppedForm";

import {
	Box,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SelectSourceForm from "./SelectSourceForm";
import ModelMethod from "./ModelMethod";


const ModelsForm = (): JSX.Element => {
	const navigate = useNavigate();
	const steps = [
		{
			formKey: "datasource",
			name: "Select a data source",
			component: <SelectSourceForm />,
			isRequireContinueCta: true,
			beforeNextStep: () => true,
		},
		{
			formKey: "selectModelType",
			name: "Select a Modelling Method",
			component: <ModelMethod />,
			isRequireContinueCta: true,
			beforeNextStep: () => false,
		},
	];

	return (
		<Drawer isOpen onClose={() => navigate(-1)} placement='right' size='100%'>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerBody>
					<Box width='100%'>
						<SteppedForm steps={steps} />
					</Box>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default ModelsForm;