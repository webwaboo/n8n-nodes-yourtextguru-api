import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MyTemplate implements INodeType {
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
				name: 'MyYourtextGuruApi',
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
			],
			//default option displayed
			default: 'Project',
		},
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
					name: 'Group',
					//name for the system
					value: 'group',
				},
				{
					name: 'Group',
					value: 'group',
				},
			],
			//default option displayed
			default: 'Project',
		},
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
					name: 'Guide',
					//name for the system
					value: 'guide',
				},
				{
					name: 'Group',
					value: 'group',
				},
			],
			//default option displayed
			default: 'Project',
		},
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
					name: 'SEO txl',
					//name for the system
					value: 'seotxl',
				},
				{
					name: 'Group',
					value: 'group',
				},
			],
			//default option displayed
			default: 'Project',
		},
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
					name: 'Status',
					//name for the system
					value: 'status',
				},
				{
					name: 'Group',
					value: 'group',
				},
			],
			//default option displayed
			default: 'Project',
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
						'Project',
					],
				},
			},
			options: [
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get',
					value: 'get',
					action: 'Get organization projects list',
					description: 'Get the list of projects for an organization',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '/projects',
						},
					},
				},
			],
			default: 'get',
		},
		{
			// operation 1 for resource marsRoverPhotos
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				//only show in resource:
				show: {
					resource: ['marsRoverPhotos'],
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
		},
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
					resource: ['marsRoverPhotos'],
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
					resource: ['marsRoverPhotos'],
					operation: ['get'],
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
					resource: ['astronomyPictureOfTheDay'],
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
