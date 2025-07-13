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
					name: 'Project',
					//name for the system
					value: 'project',
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
			default: 'project',
		},


		// All operations for <Project>
		{
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
					name: 'Create',
					value: 'createProject',
					action: 'Create project',
					description: 'Create a new project',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '/projects',
						},
					},
				},
					{
					//Name of the operation in dropdown = label in Make
					name: 'Delete',
					value: 'deleteProject',
					action: 'Delete project',
					description: 'Delete one project and all guides inside',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'DELETE',
							url: '/projects',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get',
					value: 'getProject',
					action: 'Get project information',
					description: 'Get a project\'s information',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/projects/{{$parameter.projectId}}',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get Many',
					value: 'listProjects',
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
					name: 'Update',
					value: 'updateProject',
					action: 'Update project',
					description: 'Delete one project and all guides inside',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '/projects',
						},
					},
				}
			],
			default: 'listProjects',
		},


		// All Operations for <Guide>
		{
			displayName: 'Operation',
			name: 'operation',
			// Display the operations in a dropdown
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					// select the resource corresponding to the endpoint
					resource: [
						'guide',
					],
				},
			},
			options: [
				{
					//Name of the operation in dropdown = label in Make
					name: 'Analyze Text',
					value: 'analyzeText',
					action: 'Analyze text',
					description: 'Analyze a text to see if it meets the brief',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/brief/analyze',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Check',
					value: 'check',
					action: 'Check guide',
					description: 'Analyze a given text against the semantic and SEO recommendations of a specific guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/check',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Create',
					value: 'createGuide',
					action: 'Create guide',
					description: 'Create a new guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '/guides',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Delete',
					value: 'deleteGuide',
					action: 'Delete guide',
					description: 'Delete a guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'DELETE',
							url: '=/guides/{{$parameter.guideId}}',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get',
					value: 'getGuide',
					action: 'Get guide',
					description: 'Get a specific gide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '/guides',
						},
					},
				},
				{
					//Name of the operation in dropdown = label in Make
					name: 'Get Many',
					value: 'listGuides',
					action: 'List all guides',
					description: 'List all the organization\'s guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '/guides',
						},
					},
				},
			],
			default: 'listGuides',
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
					resource: ['project'],
				},
			},
		},
		{
			// name of options 2
			displayName: 'Project ID',
			description: 'ID of the project',
			required: true,
			name: 'projectId',
			type: 'string',
			default:'',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['project','group'],
					operation: ['getProject','deleteProject','updateProject','createGroups'],
				},
			},
		},
		{
			// name of options 2
			displayName: 'Project ID',
			description: 'ID of the project',
			name: 'projectIdOptionnal',
			type: 'string',
			default:'',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['createGuide','listGuides'],
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
