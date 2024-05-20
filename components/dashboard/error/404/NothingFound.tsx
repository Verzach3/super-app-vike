import { Container, Title, Text, Button, Group, Center } from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "./NothingFound.module.css";
import { navigate } from "vike/client/router";

export function NothingFound() {
	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>No hay nada aqui</Title>
					<Text
						c={"dimmed"}
						size="lg"
						ta="center"
						className={classes.description}
					>
						La página que intentas abrir no existe. Puede que hayas escrito mal
						la dirección, o que la página se haya movido a otra URL. Si crees
						que esto es un error, contacta con soporte.
					</Text>
					<Group justify="center">
						<Button
							size="md"
							onClick={() => {
								navigate("/");
							}}
						>
							Volver al Inicio
						</Button>
					</Group>
				</div>
			</div>
		</Container>
	);
}
