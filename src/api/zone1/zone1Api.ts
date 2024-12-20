import { UpdateAbstractApi } from '../../service/updateAbstractApi.js';
import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService.js';
import { Zone1RequestData, Zone1ResponseData } from './zone1Schemas.js';

export class Zone1Api extends UpdateAbstractApi<Zone1RequestData, Zone1ResponseData> {
  page = '/zo_z1.xml';

  async getResponse(data: string): Promise<Zone1ResponseData> {
    console.log('Successfully fetched `/zone1` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      name: getValueFromMap(schemaXmlMap, 'zone1Name'),
      serviceEnabled: getValueFromMap(schemaXmlMap, 'zone1ServiceEnabled') === '1',
      status: getValueFromMap(schemaXmlMap, 'zone1Status'),
      statusReason: getValueFromMap(schemaXmlMap, 'zone1StatusReason'),
      temperature: getValueFromMap(schemaXmlMap, 'zone1Temperature'),
      requiredTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredTemperature'),
      heatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1HeatingWaterTemperature'),
      requiredHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredHeatingWaterTemperature'),
      winterSummerModeByDateState: getValueFromMap(schemaXmlMap, 'zone1WinterSummerModeByDateState') === '1',
      winterSummerModeByTemperatureState:
        getValueFromMap(schemaXmlMap, 'zone1WinterSummerModeByTemperatureState') === '1',
      humidityState: getValueFromMap(schemaXmlMap, 'zone1HumidityState'),
      humidity: getValueFromMap(schemaXmlMap, 'zone1Humidity'),
    };
  }
}
