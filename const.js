const env = require('env')

let resUrl
let mp3FilePath
if(env==='dev'){
  resUrl = 'http://10.19.190.21:8081'
  mp3FilePath = '/App/nginx/resource/mp3'
}else if(env==='prod'){
  resUrl='http://47.98.148.95'
  mp3FilePath='/root/nginx/upload/mp3'
}


const category = [
  'Biomedicine',
  'BusinessandManagement',
  'ComputerScience',
  'EarthSciences',
  'Economics',
  'Engineering',
  'Education',
  'Environment',
  'Geography',
  'History',
  'Laws',
  'LifeSciences',
  'Literature',
  'SocialSciences',
  'MaterialsScience',
  'Mathematics',
  'MedicineAndPublicHealth',
  'Philosophy',
  'Physics',
  'PoliticalScienceAndInternationalRelations',
  'Psychology',
  'Statistics'
]


module.exports = {
  resUrl,
  category,
  mp3FilePath
}
