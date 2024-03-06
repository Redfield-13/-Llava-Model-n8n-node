 import {IExecuteFunctions,} from 'n8n-core';

import {
	IDataObject,INodeExecutionData,INodeType,INodeTypeDescription,} from 'n8n-workflow';

// Main Class
export class Llava implements INodeType {
    description: INodeTypeDescription = {
      displayName: 'Ask LLAVA',
      name: 'Llava',
      icon: 'file:exchangeRate.svg',
      group: ['input'],
      version: 1,
      description: 'Ask our model LLAVA about anythin in any image.',
      defaults: {
        name: 'Llava',
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
        ,{
          displayName: 'Top-P (Decrease to Ignore Less Likely Tokens)',
          name: 'top_p',
          type: 'number',
          noDataExpression: true,
          default:1,
          displayOptions: {
          },

        },{
          displayName: 'Temperature',
          name: 'temperature',
          type: 'number',
          noDataExpression: true,
          default:0.2,
          displayOptions: {
          },

        }
        ,{
          displayName: 'Max Tokens (A Word Is 2-3 Tokens)',
          name: 'max_tokens',
          type: 'number',
          noDataExpression: true,
          default:1024,
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
            const top_p = this.getNodeParameter('top_p',i) as number;
            const temperature = this.getNodeParameter('temperature',i) as number;
            const max_tokens = this.getNodeParameter('max_tokens',i) as number;

            let Url = `http://127.0.0.1:8000/llava?url=${imageUrl}&prompt=${prompt}&top_p=${top_p}&temperature=${temperature *100}&max_tokens=${max_tokens}`;
            let response = await this.helpers.request({ method: 'GET', url: Url, json: true });
            let trace = response
            responseData.push({Url, trace})
        }

        return this.prepareOutputData(responseData.map((item) => ({ json: item })));
      }
    }
