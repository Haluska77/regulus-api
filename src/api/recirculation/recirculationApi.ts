import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService.js';
import { RecirculationResponseData } from './recirculationSchemas.js';

export class RecirculationApi extends AbstractApi<RecirculationResponseData> {
  page = '/tv_c.xml';

  async getResponse(data: string): Promise<RecirculationResponseData> {
    console.log('Successfully fetched `/recirculation` data');
    const schemaXmlMap = await parseXmlToMap(data);

    return {
      serviceEnabled: getValueFromMap(schemaXmlMap, 'recirculationServiceEnabled') === '1',
      state: getValueFromMap(schemaXmlMap, 'recirculationState') === '1',
      period: getValueFromMap(schemaXmlMap, 'recirculationPeriod'),
      delay: getValueFromMap(schemaXmlMap, 'recirculationDelay'),
      immediatePeriod: getValueFromMap(schemaXmlMap, 'recirculationImmediatePeriod'),
      immediateState: getValueFromMap(schemaXmlMap, 'recirculationImmediateState') === '1',
      useTimeProgramState: getValueFromMap(schemaXmlMap, 'recirculationUseTimeProgramState') === '1',
      useSecondPeriodState: getValueFromMap(schemaXmlMap, 'recirculationUseSecondPeriodState') === '1',
    };
  }
}
