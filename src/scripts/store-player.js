import { reactive } from "vue";

const storage = reactive({
	playerId: "",
	playerMoney: 0,
});

export const storePlayer = (player) => {
	storage.playerId = player.playerId;
	storage.playerMoney = player.playerMoney;
};

export const usePlayer = () => {
	return storage;
};
