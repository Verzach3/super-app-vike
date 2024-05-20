import { Carousel } from "@mantine/carousel";
import ShortCut from "@/components/patient/ShortCut";
import consultory from "@/assets/consultory.avif";
import paying_bills from "@/assets/patients/paying_bills.png";
import lab_results from "@/assets/patients/lab_results.png";
import appointment from "@/assets/patients/appointment.png";
export function PatientShortcuts() {
	return (
		<Carousel
			slideGap={"xs"}
			withIndicators
			slideSize={"10%"}
			align={"start"}
			withControls={false}
			slidesToScroll={"auto"}
		>
			<Carousel.Slide>
				<ShortCut
					image={paying_bills}
					title={"Pagar Facturas"}
					description={"Paga tu factura de manera segura y rápida"}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<ShortCut
					image={lab_results}
					title={"Ver tus resultados"}
					description={"Revisa tus resultados de laboratorio en linea"}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<ShortCut
					image={appointment}
					title={"Pedir una cita"}
					description={"Agenda tu cita con tu médico de confianza"}
				/>
			</Carousel.Slide>
		</Carousel>
	);
}
