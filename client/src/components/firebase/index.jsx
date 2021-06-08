import firebase from 'firebase/app'
import 'firebase/storage'

const ApiKey = process.env.ApiKey
const Authdomain = process.env.Authdomain
const ProjectId = process.env.ProjectId
const StorageBucket = process.env.StorageBucket
const MessagingSenderId = process.env.MessagingSenderId
const AppId = process.env.AppId
const MeasurementId = process.env.MeasurementId

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ApiKey,
  authDomain: Authdomain,
  projectId: ProjectId,
  storageBucket: "recipeapp-react.appspot.com",
  messagingSenderId: MessagingSenderId,
  appId: AppId,
  measurementId: MeasurementId
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}
