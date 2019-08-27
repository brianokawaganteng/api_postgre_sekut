const express 	= require('express');
const bodyParser= require('body-parser');
const app 	= express('');
const {Client} 	= require('pg');


app.use(bodyParser.json());
/*app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

//set folder public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use('/assets',express.static(__dirname +'/public'));*/

//connection
/*const {Client} = require ('pg');*/

const client = new Client({
					user :"postgres",
					password:1234,
					host:"localhost",
					port:5432,
					database:"nodejs_postgre"
});
client.connect((err)=>{
	if (err) throw err;
	console.log('Connected Sekut...');
});



//Halaman utama
app.get('/api/siswa',(req, res)=>{
	let sql = "SELECT id,nama_lengkap,TO_CHAR(tanggal_lahir,'yyyy-mm-dd') tanggal_lahir, alamat FROM siswa";
	client.query(sql,(err, results) => {
		if (err) throw err;	 
	res.send(JSON.stringify({"status": 200, "error": null, "response":results.rows}));
		});
		/*res.status(200).send(results.rows);*///MENGECEK DATA
	});

//Halaman Save
app.post('/api/siswa/:id',(req, res)=>{
	let sql = "insert into siswa (nama_lengkap,tanggal_lahir,alamat) values ('"+req.body.nama_lengkap+"','"+req.body.tanggal_lahir+"','"+req.body.alamat+"');";
	let query = client.query(sql,(err, results) => {
		if (err) throw err;
		/*res.send(JSON.stringify({"status": 200, "error": null, "response":results.rows}));*/
		res.status(200).send("Data Sekut Cek:"+sql);
	});
});
app.put('/api/siswa/:id',(req, res)=>{
	let sql = "UPDATE siswa SET nama_lengkap='"+req.body.nama_lengkap_edit+"',tanggal_lahir='"+req.body.tanggal_lahir+"',alamat='"+req.body.alamat_edit+"' WHERE id="+req.body.id;
	let query = client.query(sql,(err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response":results.rows}));
	});
});
app.delete('/api/siswa/:id',(req, res)=>{
	let sql = "DELETE FROM siswa WHERE id="+req.params.id;
	let query = client.query(sql,(err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"response":"Delete Sekut Berhasil:"+sql}));
	});
});


app.listen(8000,() => {
	console.log('Server is running at port 8000');
});