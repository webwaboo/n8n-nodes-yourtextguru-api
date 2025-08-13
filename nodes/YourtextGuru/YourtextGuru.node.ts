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
				// Operation : createProject
				{
					name: 'Create',
					value: 'createProject',
					action: 'Create project',
					description: 'Create a new project',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/projects',
							body: {
								host: '={{$parameter.host}}',
								name: '={{$parameter.nameProject}}',
							}
						},
					},
				},
				// Operation : deleteProject
				{
					name: 'Delete',
					value: 'deleteProject',
					action: 'Delete project',
					description: 'Delete one project and all guides inside',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'DELETE',
							url: '=/projects/{{$parameter.projectId}}',
						},
					},
				},
				// Operation : getProject
				{
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
				// Operation : listProjects
				{
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
					// Operation : updateProject
					name: 'Update',
					value: 'updateProject',
					action: 'Update project',
					description: 'Delete one project and all guides inside',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/projects/{{$parameter.projectId}}',
							body: {
								host: '={{$parameter.host}}',
								name: '={{$parameter.nameProject}}',
							}
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
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				// Operation : analyzeText
				{
					name: 'Analyze Text',
					value: 'analyzeText',
					action: 'Analyze text',
					description: 'Analyze a text to see if it meets the brief',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/brief/analyze',
							body: {
								text: '={{$parameter.text}}'
							},
						},
					},
				},
				// Operation : check
				{
					name: 'Check',
					value: 'check',
					action: 'Check guide',
					description: 'Analyze a given text against the semantic and SEO recommendations of a specific guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/check',
							body: {
								text: '={{$parameter.text}}'
							}
						},
					},
				},
				// Operation : createGuide
				{
					name: 'Create Guide',
					value: 'createGuide',
					action: 'Create guide',
					description: 'Create a new guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides',
							qs: {
								query: '={{$parameter.query}}',
								lang: '={{$parameter.lang}}',
								projectId: '={{$parameter.projectIdOptional}}',
								type: '={{$parameter.guideType}}',
								groupId: '={{$parameter.groupIdOptional}}',
							}
						},
					},
				},
				// Operation : createBrief
				{
					name: 'Create Brief',
					value: 'createBrief',
					action: 'Create guide brief',
					description: 'Create a new brief guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/brief',
						},
					},
				},
				// Operation : deleteGuide
				{
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
				// Operation : getGuide
				{
					name: 'Get',
					value: 'getGuide',
					action: 'Get guide',
					description: 'Get a specific guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/guides/{{$parameter.guideId}}/{{$parameter.guideTypeSearch}}',
						},
					},
				},
				// Operation : listGuides
				{
					name: 'Get Many',
					value: 'listGuides',
					action: 'List all guides',
					description: 'List all the organization\'s guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/guides',
							qs: {
								apiOnly: '={{$parameter.apiOnly}}',
								groupId: '={{$parameter.groupIdOptional}}',
								lang: '={{$parameter.langOptionnal}}',
								lastId: '={{$parameter.lastId}}',
								projectId: '={{$parameter.projectIdOptional}}',
								status: '={{$parameter.status}}',
							}
						},
					},
				},
				// Operation : getGuideBriefAnalysis with return all or id
				{
					name: 'Get Brief Analysis',
					value: 'getGuideBriefAnalysis',
					action: 'Get brief analysis',
					description: 'Get the last briefs analysis',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/guides/{{$parameter.guideId}}/brief/analyze',
						},
					},
				},
			],
			default: 'listGuides',
		},

		// All Operations for <Status>
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
						'status',
					],
				},
			},
			options: [
				// Operation : getStatus
				{
					name: 'Get Status',
					value: 'getStatus',
					action: 'Get status',
					description: 'Get the current status of the organization\'s account, including available tokens and guides in progress',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/status',
						},
					},
				},
				// Operation : getTokenConsumption
				{
					name: 'Get Consumption',
					value: 'getTokenConsumption',
					action: 'Get consumption',
					description: 'Get Token Consumption',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/consumption/openai',
						},
					},
				},
			],
			default: 'getStatus',
		},

		// All operations for <Group>
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
						'group',
					],
				},
			},
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				// Operation : addListinGroup
				{
					name: 'Add List in Group',
					value: 'addListinGroup',
					action: 'Add list of guide in group',
					description: 'Add a list of guide in a group',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}/guides/add',
							body: {
								guideId: '={{$parameter.guideIdCollection}}'
							}
						},
					},
				},
				// Operation : createGroup
				{
					name: 'Create',
					value: 'createGroup',
					action: 'Create group',
					description: 'Create a new group',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/projects/{{$parameter.projectId}}/groups',
							body: {
								name: '={{$parameter.nameGroup}}'
							}
						},
					},
				},
				// Operation : createTopicalMesh
				{
					name: 'Create Topical Mesh',
					value: 'createTopicalMesh',
					action: 'Create a topical mesh',
					description: 'Create a thematic mesh from all the guides in the group',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}/topicalMesh',
						},
					},
				},
				// Operation : getAllGroupsinProject
				{
					name: 'List All Groups in a Project',
					value: 'getAllGroupsinProject',
					action: 'List all groups in a project',
					description: 'Get all groups in a project',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/projects/{{$parameter.projectId}}/groups',
						},
					},
				},
				// Operation : getGroupInfo
				{
					name: 'Get Group Info',
					value: 'getGroupInfo',
					action: 'Get group info',
					description: 'Get info of a group',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}',
						},
					},
				},
				// Operation : getTopicalMesh
				{
					name: 'Get Topical Mesh',
					value: 'getTopicalMesh',
					action: 'Get topical mesh',
					description: 'Get a group topical mesh',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}/topicalMesh',
						},
					},
				},
				// Operation : getTopicalMeshPaa
				{
					name: 'Get Topical Mesh Paa',
					value: 'getTopicalMeshPaa',
					action: 'Get topical mesh paa',
					description: 'Get a topical mesh paa',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}/topicalMesh/paa',
						},
					},
				},
				// Operation : getTopicalMeshWordcloud
				{
					name: 'Get Topical Mesh Wordcloud',
					value: 'getTopicalMeshWordcloud',
					action: 'Get topical mesh wordcloud',
					description: 'Get a topical mesh wordcloud',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'GET',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}/topicalMesh/wordcloud',
						},
					},
				},
				// Operation : updateGroup
				{
					name: 'Update',
					value: 'updateGroup',
					action: 'Update group',
					description: 'Update a group',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}',
							body: {
								name: '={{$parameter.nameGroup}}'
							}
						},
					},
				},
				// Operation : deleteGroup
				{
					name: 'Delete Group',
					value: 'deleteGroup',
					action: 'Delete group',
					description: 'Delete a whole group',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'DELETE',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}',
						},
					},
				},
				// Operation : removeGuideinGroup
				{
					name: 'Delete Guide',
					value: 'removeGuideinGroup',
					action: 'Delete guide from group',
					description: 'Remove a list of guide from group',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/projects/{{$parameter.projectId}}/groups/{{$parameter.groupId}}/guides/remove',
							body: {
								guideId: '={{$parameter.guideIdCollection}}'
							}
						},
					},
				},
			],
			default: 'getAllGroupsinProject',
		},

		// All Operations for <Seo txl>
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
						'seotxl',
					],
				},
			},
			options: [
				// Operation : generateOutlineTextBasedonGuideWords
				{
					name: 'Generate Outline Text Based on Guide Words',
					value: 'generateOutlineTextBasedonGuideWords',
					action: 'Generate outline text based on guide words',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/seotxl/outline',
							body: {
								text: '={{$parameter.text}}'
							}
						},
					},
				},
				// Operation : generateQuestionsBasedonGuideWords
				{
					name: 'Generate Questions Based on Guide Words',
					value: 'generateQuestionsBasedonGuideWords',
					action: 'Generate questions based on guide words',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/seotxl/questions',
						},
					},
				},
				// Operation : generateTextBasedonGuideWords
				{
					name: 'Generate Text Based on Guide Words',
					value: 'generateTextBasedonGuideWords',
					action: 'Generate text based on guide words',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/seotxl/auto',
							body: {
								text: '={{$parameter.text}}'
							},
						},
					},
				},
				// Operation : generateTextfromGuide
				{
					name: 'Generate Text From a Guide',
					value: 'generateTextfromGuide',
					action: 'Generate text from a guide',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/seotxl/create',
							body: {
								text: '={{$parameter.text}}',
								maxWords: '={{$parameter.maxWords}}',
								temperature: '={{$parameter.temperature}}'
							},
						},
					},
				},
				// Operation : rephraseTextBasedonGuideWords
				{
					name: 'Rephrase Text Based on Guide Words',
					value: 'rephraseTextBasedonGuideWords',
					action: 'Rephrase text based on guide words',
					routing: {
						// set method and url for the endpoint
						request: {
							method: 'POST',
							url: '=/guides/{{$parameter.guideId}}/seotxl/rephrase',
							body: {
								text: '={{$parameter.text}}'
							},
						},
					},
				},

			],
			default: 'generateOutlineTextBasedonGuideWords',
		},

		// parameter : projectId
		{
			displayName: 'Project ID',
			description: 'ID of the project',
			required: true,
			name: 'projectId',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['project'],
					operation: ['getProject','deleteProject','updateProject','createGroups','addListinGroup'],
				},
			},
		},
		// parameter : projectId
		{
			displayName: 'Project ID',
			description: 'ID of the project',
			required: true,
			name: 'projectId',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['group'],
				},
			},
		},
		// parameter : projectId optional
		{
			displayName: 'Project ID',
			description: 'ID of the project',
			name: 'projectIdOptional',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['createGuide','listGuides'],
				},
			},
		},
		// parameter : groupId
		{
			displayName: 'Group ID',
			description: 'ID of the group',
			required: true,
			name: 'groupId',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['group'],
					operation: ['addListinGroup','deleteGroup','getGroupInfo','getTopicalMesh','getTopicalMeshPaa','getTopicalMeshWordcloud','removeGuideinGroup','updateGroup','createTopicalMesh']
				},
			},
		},
		// parameter : groupId optional
		{
			displayName: 'Group ID',
			description: 'ID of the group',
			name: 'groupIdOptional',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['createGuide','listGuides','createGuide'],
				},
			},
		},
		// parameter : guideTypeSearch
		{
			displayName: 'Type of Guide',
			name: 'guideTypeSearch',
			type: 'options',
			options :[
				{name: 'Guide', value: ''},
				{name: 'Guide Brief', value: 'brief'},
				{name: 'Guide PAA', value: 'paa'},
				{name: 'Guide Related Informations', value: 'related'},
				{name: 'Guide Serp', value: 'serp'}
			],
			/*routing: {
				request: {
					url: '=/guides/{{$parameter.guideId}}/{{$value}}'
				}
			},*/
			default:'',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['getGuide'],
				},
			},
		},
		// parameter : guideId
		{
			displayName: 'Guide ID',
			description: 'ID of the guide',
			name: 'guideId',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide','seotxl','group'],
					operation: ['getGuide','getGuideBriefAnalysis','check','analyzeText','createBrief','deleteGuide']
				},
			},
		},
		// parameter : return all
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			description: 'Whether to return all results or only up to a given limit',
			default: true,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['getGuideBriefAnalysis'],
				},
			},
		},
		// parameter : analyzeId
		{
			displayName: 'Analyze ID',
			required: true,
			name: 'analyzeId',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['getGuideBriefAnalysis'],
					returnAll: [false]
				},
			},
			routing: {
				request: {
					url: '=/guides/{{$parameter.guideId}}/brief/analyze/{{$value}}'
				}
			}
		},
		// parameter : apiOnly
		{
			displayName: 'API Only',
			description: 'Get only guide created by API (default: get all)',
			name: 'apiOnly',
			type: 'options',
			options: [
				{ name: 'Yes', value: 1 },
				{ name: 'No', value: 0 }
			],
			default: 0,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['listGuides']
				},
			},
		},
		// parameter : lang
		{
			displayName: 'Language',
			description: 'Language (default: get all)',
			default: 'en_US',
			required: true,
			name: 'lang',
			type: 'options',
			options: [
        { name: "Dutch (Netherlands)", value: "nl_NL" },
        { name: "English (Australia)", value: "en_AU" },
        { name: "English (Canada)", value: "en_CA" },
        { name: "English (Egypt)", value: "en_EG" },
        { name: "English (India)", value: "en_IN" },
        { name: "English (South Africa)", value: "en_ZA" },
        { name: "English (United Arab Emirates)", value: "en_AE" },
        { name: "English (United Kingdom)", value: "en_GB" },
        { name: "English (United States)", value: "en_US" },
        { name: "French (Andorra)", value: "fr_AD" },
        { name: "French (Belgium)", value: "fr_BE" },
        { name: "French (Canada)", value: "fr_CA" },
        { name: "French (France)", value: "fr_FR" },
        { name: "French (Luxembourg)", value: "fr_LU" },
        { name: "French (Morocco)", value: "fr_MA" },
        { name: "French (Switzerland)", value: "fr_CH" },
				{ name: "German (Austria)", value: "de_AT" },
        { name: "German (Belgium)", value: "de_BE" },
        { name: "German (Germany)", value: "de_DE" },
        { name: "German (Switzerland)", value: "de_CH" },
        { name: "Italian (Italy)", value: "it_IT" },
        { name: "Italian (Switzerland)", value: "it_CH" },
        { name: "Polish (Poland)", value: "pl_PL" },
        { name: "Portuguese (Brazil)", value: "pt_BR" },
        { name: "Portuguese (Portugal)", value: "pt_PT" },
        { name: "Romanian (Romania)", value: "ro_RO" },
				{ name: "Spanish (Argentina)", value: "es_AR" },
        { name: "Spanish (Chile)", value: "es_CL" },
        { name: "Spanish (Colombia)", value: "es_CO" },
        { name: "Spanish (Mexico)", value: "es_MX" },
        { name: "Spanish (Peru)", value: "es_PE" },
        { name: "Spanish (Spain)", value: "es_ES" },
        { name: "Spanish (United States)", value: "es_US" },
      ],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['createGuide']
				},
			},
		},
		// parameter : langOptionnal
		{
			displayName: 'Language',
			description: 'Language (default: get all)',
			default: '',
			name: 'langOptionnal',
			type: 'options',
			options: [
				{ name: "All", value: ""},
        { name: "Dutch (Netherlands)", value: "nl_NL" },
        { name: "English (Australia)", value: "en_AU" },
        { name: "English (Canada)", value: "en_CA" },
        { name: "English (Egypt)", value: "en_EG" },
        { name: "English (India)", value: "en_IN" },
        { name: "English (South Africa)", value: "en_ZA" },
        { name: "English (United Arab Emirates)", value: "en_AE" },
        { name: "English (United Kingdom)", value: "en_GB" },
        { name: "English (United States)", value: "en_US" },
        { name: "French (Andorra)", value: "fr_AD" },
        { name: "French (Belgium)", value: "fr_BE" },
        { name: "French (Canada)", value: "fr_CA" },
        { name: "French (France)", value: "fr_FR" },
        { name: "French (Luxembourg)", value: "fr_LU" },
        { name: "French (Morocco)", value: "fr_MA" },
        { name: "French (Switzerland)", value: "fr_CH" },
				{ name: "German (Austria)", value: "de_AT" },
        { name: "German (Belgium)", value: "de_BE" },
        { name: "German (Germany)", value: "de_DE" },
        { name: "German (Switzerland)", value: "de_CH" },
        { name: "Italian (Italy)", value: "it_IT" },
        { name: "Italian (Switzerland)", value: "it_CH" },
        { name: "Polish (Poland)", value: "pl_PL" },
        { name: "Portuguese (Brazil)", value: "pt_BR" },
        { name: "Portuguese (Portugal)", value: "pt_PT" },
        { name: "Romanian (Romania)", value: "ro_RO" },
				{ name: "Spanish (Argentina)", value: "es_AR" },
        { name: "Spanish (Chile)", value: "es_CL" },
        { name: "Spanish (Colombia)", value: "es_CO" },
        { name: "Spanish (Mexico)", value: "es_MX" },
        { name: "Spanish (Peru)", value: "es_PE" },
        { name: "Spanish (Spain)", value: "es_ES" },
        { name: "Spanish (United States)", value: "es_US" },
      ],
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['listGuides']
				},
			},
		},
		// parameter : lastId
		{
			displayName: 'Last ID',
			description: 'Last guide ID to get next data (default 0)',
			name: 'lastId',
			type: 'number',
			default: 0,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['listGuides','getTokenConsumption']
				},
			},
		},
		// parameter : status
		{
			displayName: 'Status',
			description: 'Get guide with a specific status',
			name: 'status',
			type: 'options',
			options: [
				{ name: "All", value: "" },
        { name: "Error", value: "error" },
        { name: "In Progress", value: "in_progress" },
        { name: "Ready", value: "ready" },
        { name: "Waiting", value: "waiting" },
      ],
			default: "",
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['listGuides']
				},
			},
		},
		// parameter : text
		{
			displayName: 'Text',
			description: 'A long text in UTF-8 encoding',
			name: 'text',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide','seotxl'],
					operation: ['check','analyzeText',
						'generateOutlineTextBasedonGuideWords','generateTextBasedonGuideWords','generateTextfromGuide','rephraseTextBasedonGuideWords']
				},
			},
		},
		// parameter : guideType
		{
			displayName: 'Type of Guide',
			name: 'guideType',
			type: 'options',
			description: "Guide type (google by default)",
			options :[
				{name: 'Google', value: 'google'},
				{name: 'Bing', value: 'bing'},

			],
			default:'google',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['createGuide'],
				},
			},
		},
		// parameter : query
		{
			displayName: 'Query',
			description: 'Request used to generate a guide',
			name: 'query',
			required: true,
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['guide'],
					operation: ['createGuide']
				},
			},
		},
		// parameter : host
		{
			displayName: 'Host',
			description: 'URL of your website ex: www.org.com',
			name: 'host',
			required: true,
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['project'],
					operation: ['createProject','updateProject']
				},
			},
		},
		// parameter : nameProject
		{
			displayName: 'Name',
			description: 'Name of your project',
			name: 'nameProject',
			required: true,
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['project'],
					operation: ['createProject','updateProject']
				},
			},
		},
		// parameter : nameGroup
		{
			displayName: 'Name',
			description: 'Name of your group',
			name: 'nameGroup',
			required: true,
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['group'],
					operation: ['createGroup','updateGroup']
				},
			},
		},
		// parameter : maxWords
		{
			displayName: 'Maximum Words',
			description: 'Set maximum number of words',
			name: 'maxWords',
			required: true,
			type: 'number',
			default: 500,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['seotxl'],
					operation: ['generateTextfromGuide']
				},
			},
		},
		// parameter : temperature
		{
			displayName: 'Temperature',
			description: 'Set the temperature for the model',
			name: 'temperature',
			required: true,
			type: 'number',
			default: 1,
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['seotxl'],
					operation: ['generateTextfromGuide']
				},
			},
		},
		// parameter : guideIdCollection
		{
			displayName: 'Guide IDs',
			description: 'List of guide ID to add to a group',
			name: 'guideIdCollection',
			required: true,
			type: 'string',
			default: [],
			typeOptions: {
				multipleValues: true
			},
			displayOptions: {
				show: {
					//only show if you've selected :
					resource: ['group'],
					operation: ['addListinGroup','removeGuideinGroup']
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
