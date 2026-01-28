// Queremos probar la función FormatearDatosMeteo usando un mock de la respuesrta de la función obtenerDatosMeteo.
// podemos crear dicha respuesta simulada como un objeto JSON que contenga datos meteorológicos típicos.
const {
  obtenerDatosMeteo,
  interpretarCodigoTiempo,
  interpretarDireccionViento,
  formatearDatosMeteo,
} = require("./weatherService");

const datosMock = {
  current: {
    temperature_2m: 20,
    relative_humidity_2m: 50,
    apparent_temperature: 19,
    precipitation_probability: 0,
    precipitation: 0,
    weather_code: 0,
    wind_speed_10m: 10,
    wind_direction_10m: 180,
  },
  current_units: {
    temperature_2m: "°C",
    relative_humidity_2m: "%",
    apparent_temperature: "°C",
    precipitation_probability: "%",
    precipitation: "mm",
    weather_code: "wmo code",
    wind_speed_10m: "km/h",
    wind_direction_10m: "°",
  },
};

describe("formatearDatosMeteo", () => {
  test("debería formatear correctamente los datos meteorológicos", () => {
    const latitude = 43.2833;
    const longitude = -2.1667;
    const resultado = formatearDatosMeteo(datosMock, latitude, longitude);
    expect(resultado).toContain("📍 Ubicación: 43.2833°N, -2.1667°W");
  });

  test("Deberia contener emojis en la salida formateada", () => {
    const latitude = 43.2833;
    const longitude = -2.1667;
    const resultado = formatearDatosMeteo(datosMock, latitude, longitude);
    expect(resultado).toContain("☀️");
    expect(resultado).not.toContain("😈");
  });
});

describe("InterpretarCodigoTiempo", () => {
  test("Deberia devolver descripcion y emoji correctos para codigo 0", () => {
    const resultado = interpretarCodigoTiempo(0);
    expect(resultado).toEqual({ descripcion: "Despejado", emoji: "☀️" });
  });
});

describe("InterpretarCodigoDirección", () => {
  test("Deberia devolver descripcion y emoji correctos los grados 295", () => {
    const resultado = interpretarDireccionViento(295);
    expect(resultado).toEqual({ direccion: "NW", emoji: "↖️" });
  });

  test("Deberia devolver descripcion y emoji correctos los grados 45", () => {
    const resultado = interpretarDireccionViento(45);
    expect(resultado).toEqual({ direccion: "NE", emoji: "↗️" });
  });

  test("Deberia devolver descripcion y emoji correctos los grados 180", () => {
    const resultado = interpretarDireccionViento(180);
    expect(resultado).toEqual({ direccion: "S", emoji: "⬇️" });
  });

  test("Deberia devolver descripcion y emoji correctos en grados erroneos", () => {
    const resultado = interpretarDireccionViento("h");
    expect(resultado).toEqual({ direccion: "?", emoji: "❓" });
  });
});

describe("Obtener datos meteo", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("debe retornar datos meteorológicos correctos", async () => {
    const resultado = {
      current: { temperature_2m: 24 },
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => resultado,
    });

    const datos = await obtenerDatosMeteo(50, -5);

    expect(datos).toEqual(resultado);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("latitude=50"),
    );
  });

  test("Debe manejar errores de API", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not found",
      json: async () => resultado,
    });

    await expect(obtenerDatosMeteo(1, -1)).rejects.toThrow(
      "Fallo al obtener datos meteorológicos: Error en la petición: 404 Not found",
    );
  });

  test("Debe manejar errores de red", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network Error"));

    await expect(obtenerDatosMeteo(1, -1)).rejects.toThrow(
      "Fallo al obtener datos meteorológicos: Network Error",
    );
  });
});
