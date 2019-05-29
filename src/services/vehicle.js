import apis from './apis'
import rest from './rest'
import myAxios from './myAxios'

export default {
  getNumberOfVehicle: async (data) => {
    console.log(rest.POST, apis.vehicleAmount)
    const result = await myAxios({
      url: apis.vehicleAmount,
      method: rest.GET,
      data: JSON.stringify(data)
    })
    return result
  }
}
