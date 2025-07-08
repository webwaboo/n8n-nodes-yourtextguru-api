import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class YourtextGuru implements INodeType {
	description: INodeTypeDescription = { // Basic node details will go here
		//name displayed under the node
		displayName: 'Yourtext.Guru',
		//name of node for the system
		name: 'yourtextGuru',
		//path to the icon
		icon: 'file:YTGlogo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		//description of the node
		description: 'Yourtext.Guru is an advanced SEO content optimization tool designed to help writers and marketers create high-performing content.',
		//default name, just a the same as in displayName
		defaults: {
			name: 'Yourtext.Guru',
		},
		inputs: ['main'],
		outputs: ['main'],
		//name your credentials "MyNodeNameApi"
		credentials: [
			{
				name: 'YourtextGuruApi',
				required: true,
			},
		],
		requestDefaults: {
			//put your base url here
			baseURL: 'https://yourtext.guru/api/v2',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
},
		properties: [ //resource and operation will go here
		// Resources will go here, 1 group = 1 resource
		{
			displayName: 'Resource',
			name: 'resource',
			//type if the type of UI element to display, here we choose for a dropdown
			type: 'options',
			noDataExpression: true,
			// in the dropdown, we put name of the different options/resources
			options: [
				{
					//name displayed in dropdown
					name: 'Project',
					//name for the system
					value: 'project',
				},
				{
					name: 'Group',
					value: 'group',
				},
				{
					//name displayed in dropdown
					name: 'Guide',
					//name for the system
					value: 'guide',
				},
				{
					//name displayed in dropdown
					name: 'SEO Txl',
					//name for the system
					value: 'seotxl',
				},
				{
					//name displayed in dropdown
					name: 'Status',
					//name for the system
					value: 'status',
				}
			],
			//default option displayed
			default: 'status',
		},


		// Operations will go here, 1 operation = 1 endpoint with all params
		{
			// operation 1 for resource project
			displayName: 'Operation',
			name: 'operation',
			// Display the operations in a dropdown
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					// select the resource corresponding to the endpoint
					resource: [
						'project',
					],
				},
			},
			options: [
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get All Projects',
					value: 'get all projects',
					action: 'List all projects',
					description: 'List all the organization\'s projects',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '/projects',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get a Project',
					value: 'get a project',
					action: 'Get project information',
					description: 'Get a project\'s information',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '/projects',
						},
					},
				}
			],
			default: 'get all projects',
		},
		/*{
			// operation 1 for resource marsRoverPhotos
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				//only show in resource:
				show: {
					resource: ['project'],
				},
			},
			options: [
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get',
					value: 'get',
					action: 'Get Mars Rover photos',
					description: 'Get photos from the Mars Rover',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
						},
					},
				},
			],
			default: 'get',
		},*/
		{
			// name of options 1
			displayName: 'Rover name',
			description: 'Choose which Mars Rover to get a photo from',
			required: true,
			name: 'roverName',
			// type of options UX
			type: 'options',
			options: [
				{name: 'Curiosity', value: 'curiosity'},
				{name: 'Opportunity', value: 'opportunity'},
				{name: 'Perseverance', value: 'perseverance'},
				{name: 'Spirit', value: 'spirit'},
			],
			routing: {
				request: {
					url: '=/mars-photos/api/v1/rovers/{{$value}}/photos',
				},
			},
			default: 'curiosity',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['project'],
				},
			},
		},
		{
			// name of options 2
			displayName: 'Date',
			description: 'Earth date',
			required: true,
			name: 'marsRoverDate',
			type: 'dateTime',
			default:'',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['project'],
					operation: ['get a project'],
				},
			},
			routing: {
				request: {
					// You've already set up the URL. qs appends the value of the field as a query string
					qs: {
						earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',
					},
				},
			},
		},
		// Optional/additional fields will go here, always in type collection
		{
			displayName: 'Additional Fields',
			name: 'additionalFields',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['get'],
				},
			},
			options: [
				{
					displayName: 'Date',
					name: 'apodDate',
					type: 'dateTime',
					default: '',
					routing: {
						request: {
							// You've already set up the URL. qs appends the value of the field as a query string
							qs: {
								date: '={{ new Date($value).toISOString().substr(0,10) }}',
							},
						},
					},
				},
			],
		}
		]
	};
}
