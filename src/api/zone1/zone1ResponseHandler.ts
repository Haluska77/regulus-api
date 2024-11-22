import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService';
import { ResponseHandler } from '../../service/responseHandler';
import { Zone1Detail } from './zone1Schemas';

export class ZoZ1ResponseHandler implements ResponseHandler {
  async getResponseData(data: string): Promise<Zone1Detail> {
    console.log('Successfully fetched `/zone1` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      name: getValueFromMap(schemaXmlMap, 'zone1Name'),
      serviceEnabled: getValueFromMap(schemaXmlMap, 'zone1ServiceEnabled') === '1',
      status: getValueFromMap(schemaXmlMap, 'zone1Status'),
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
