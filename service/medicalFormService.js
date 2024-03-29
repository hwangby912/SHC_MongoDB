const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/SmartHC';

module.exports = {
    medicalFormInsertOne: function (res, name, ssn, addr, email, visitDate, disease, diseaseCode, content) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                db = db.db('SmartHC'); /* database명을 다시 한번 명시했다. 이거 안 하면 에러남 */
                console.log('db connected...ok');
                db.collection('medicalForm').insertOne(
                    {
                        "name": name,
                        "ssn": ssn,
                        "addr": addr,
                        "email": email,
                        "visitDate": visitDate,
                        "disease": disease,
                        "diseaseCode": diseaseCode,
                        "content": content
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('진료확인서 저장됨\n');
                            console.log(result);
                            res.send('진료 확인서 저장 완료');
                        }

                    }
                );
            }
        });
    }
}
