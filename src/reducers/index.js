import {combineReducers} from 'redux';
import auth from './auth';
import project from './project'
import apps from './apps'
import dashboard from './dashboard'
import alert from './alert'
import { bucketsReducer } from "./buckets"


export default combineReducers({auth, project, apps, dashboard, alert, allBuckets: bucketsReducer});