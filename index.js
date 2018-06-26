const thrift = require('thrift');
const service = require('./js/ImpalaHiveServer2Service');
const types = require('./js/beeswax_types');
const { TProtocolVersion, TOpenSessionReq, TExecuteStatementReq, TFetchResultsReq, TFetchOrientation } = require('./js/TCLIService_types');
const ser = require('./js/TCLIService');

const connection = thrift.createConnection('127.0.0.1', '21050', {
	// transport: thrift.TBufferedTransport,
	// protocol: thrift.TBinaryProtocol,
});

connection.on('open', () => console.log('Connection was opened!'));
connection.on('close', () => console.log('Connection was closed!'));
connection.on('error', () => console.error('Error occurred!'));
connection.on('connect', () => console.log('Connection was opened!'));

const client = thrift.createClient(service, connection);

console.log('TEST:', client.GetExecSummary)
console.log('TEST:', TProtocolVersion)
console.log('TEST:', new TOpenSessionReq())
console.log('OpenSession:', client.OpenSession)
console.log('ExecuteStatement:', client.ExecuteStatement)
console.log('FetchResults:', client.FetchResults)

const protocol = TProtocolVersion.HIVE_CLI_SERVICE_PROTOCOL_V6;
const req = new TOpenSessionReq({
	client_protocol: protocol,
	user: 'cloudera',
	password: 'cloudera',
});
client.OpenSession(req)
	.then((res) => {
		const req = new TExecuteStatementReq({
			sessionHandle: res.sessionHandle,
			statement: 'select * from crime',
		});
		client.ExecuteStatement(req)
			.then((res) => {
				const req = new TFetchResultsReq({
					operationHandle: res.operationHandle,
					orientation: TFetchOrientation.FETCH_NEXT,
					maxRows: 9999999,
				});
				client.FetchResults(req)
					.then((res) => console.log(res.results))
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	})
	.catch((err) => console.error(err));

// client.query(new types.Query({ query: 'select * from crime limit 10;' }))
// 	.then(handle => client.fetch(handle))
// 	.then(result => console.log(result))
// 	.catch(err => console.error(err))
// 	.done(() => connection.end());

// setTimeout(() => {
// 	console.log('Waiting...')
// }, 5000);
