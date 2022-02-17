import api from "../config/request";

export const getPokeData = async (params) => {
    if (params)
        return await api.get(params);

    return await api.get("pokemon");
};
