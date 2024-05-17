import { Carousel } from "@mantine/carousel";
import ShortCut from "@/components/patient/ShortCut";
import consultory from "@/assets/consultory.avif";
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
					image={consultory}
					title={"Pagar Facturas"}
					description={"Paga tu factura de manera segura y rápida"}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<ShortCut
					image={consultory}
					title={"Pagar Facturas"}
					description={"Paga tu factura de manera segura y rápida"}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<ShortCut
					image={consultory}
					title={"Pagar Facturas"}
					description={"Paga tu factura de manera segura y rápida"}
				/>
			</Carousel.Slide>
			<Carousel.Slide>
				<ShortCut
					image={consultory}
					title={"Pagar Facturas"}
					description={"Paga tu factura de manera segura y rápida"}
				/>
			</Carousel.Slide>
		</Carousel>
	);
}
