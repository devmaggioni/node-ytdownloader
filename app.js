import inquirer from "inquirer";
import {
	searchVideo,
	ytDownload,
	ytDownloadMp3
} from "./lib/index.js";

const path = 
process.platform === "android" ? "/sdcard/Download/" : "./";

function run() {
	try {

		inquirer
			.prompt([{
				name: "query",
				type: "input",
				message: "Digite o título ou URL do seu vídeo: ",
			}])
			.then(async(answer) => {

				let video = await searchVideo(answer.query);

				inquirer
					.prompt([{
						name: "video",
						type: "list",
						message: "Resultados: ",
						choices: [
							`${video[0].title}\n${video[0].url}`,
							`${video[1].title}\n${video[1].url}`,
							`${video[2].title}\n${video[2].url}`
						],
					},
					{
						name: "type",
						type: "list",
						message: "Escolha um formato: ",
						choices: [
							"video",
							"audio"
						],
					}])
					.then(async(answer2) => {

						console.log("\nFazendo Download do vídeo...\n");

						answer2.type === "video" ? (
							await ytDownload({
								url: answer2.video.split("\n")[1],
								name: answer2.video.split("\n")[0].toLowerCase().replace(/ /g, "-").replace(/[(),.+!?"*#@$&^~]/g, "") + ".mp4",
								path
							})
						) : (
							await ytDownloadMp3({
								url: answer2.video.split("\n")[1],
								name: answer2.video.split("\n")[0].toLowerCase().replace(/ /g, "-").replace(/[(),.+!?"*#@$&^~]/g, "") + ".mp3",
								path
							})
						);

						console.log("\nSucesso ✓\n");

					});

			});

	} catch(err) {
		console.log("Um erro inesperado aconteceu :/");
	}
}
run();