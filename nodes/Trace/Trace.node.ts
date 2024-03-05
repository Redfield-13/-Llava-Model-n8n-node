 import {IExecuteFunctions,} from 'n8n-core';

import {
	IDataObject,INodeExecutionData,INodeType,INodeTypeDescription,} from 'n8n-workflow';

// Main Class
export class Trace implements INodeType {
    description: INodeTypeDescription = {
      displayName: 'Ask LLAVA',
      name: 'Trace',
      icon: 'file:exchangeRate.svg',
      group: ['input'],
      version: 1,
      description: 'Ask our model LLAVA about anythin in any image.',
      defaults: {
        name: 'Trace',
      },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [],
    properties: [
        {
          displayName: 'Image Url',
          name: 'imageUrl',
          type: 'string',
          noDataExpression: true,
          default:"",
          displayOptions: {
          },

        },{
          displayName: 'Prompt',
          name: 'prompt',
          type: 'string',
          noDataExpression: true,
          default:"",
          displayOptions: {
          },

        }
      ],

    }
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


        

        const items = this.getInputData();
        const length = items.length as number;
        const responseData: IDataObject[] = [];

        for (let i = 0; i < length; i++) {
            const imageUrl = this.getNodeParameter('imageUrl',i) as string;
            const prompt = this.getNodeParameter('prompt',i) as string;

            let Url = `http://127.0.0.1:8000/imagedesc?url=${imageUrl}&prompt=${prompt}`;
            let response = await this.helpers.request({ method: 'GET', url: Url, json: true });
            let trace = response
            responseData.push({Url, trace})
        }

        return this.prepareOutputData(responseData.map((item) => ({ json: item })));
      }
    }
