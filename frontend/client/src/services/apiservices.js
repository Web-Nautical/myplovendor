/* eslint-disable */

import axios from "axios";
import constant from "./constant";

const vendorloginUrl = "vendor/login"
const vendordataUrl = "vendor/getvendordata"
const getgigsdataUrl = "gigs/getgigsdata"
const addgigsUrl = "gigs/addgigsdata"
const getvendorcatdataUrl = "gigs/getvendorcatdata"
const getvendorsubcatdataUrl = "gigs/getvendorsubcatdata"
const deletegigdataUrl = "gigs/deletegig"
const getgigsdatabyidUrl = "gigs/getgigsdatabyid"
const getallvendorsubcatdataUrl = 'gigs/getallvendorsubcatdata'
const updatevendordataUrl = 'vendor/updatevendordata'
const vendordashboarddataUrl = "vendor/vendordashboarddata"
const addvendorstripedataUrl = "payment/addvendorstripedata"
const addvendorstripebankdataUrl = "payment/addvendorstripebankdata"
const getvendorbankdataurl ="payment/getvendorbankdata"
const deletevendorstripebankdataurl ="payment/deletevendorstripebankdata"
const checkvendoraccountstripeUrl ="payment/checkvendoraccountstripe"
const checkuserbankexistsUrl = "payment/checkuserbankexists"
const membershippaymentUrl = "payment/membershippayment"
const expiremembershipUrl = "payment/expiremembership"
const showallusermessageUrl = "chat/showallusermessage"
const getchatdatabyidUrl = 'chat/getchatdatabyid'
const sendmessageUrl = 'chat/sendmessage'
const getvendororderUrl = "vendor/getvendororder"
const makeanofferUrl = "chat/offerstatus"
const totalpaymentreceivedUrl = "payment/totalpaymentreceived"
const setprimaryaccountUrl = "payment/setprimaryaccount"
const orderstatusUrl = "vendor/orderstatus"
const getnotificationdataUrl = "vendor/getnotificationdata"
const getstatesdataUrl = "gigs/getstatesdata"
const deletegigimageUrl = "gigs/deletegigimage"
const unreadmessagenotificationUrl = "chat/unreadmessagenotification"
const getVendorSiteDataUrl = "vendor/getVendorSiteData"



function getauthtoken(){
    let token = localStorage.getItem('AUTH_TOKEN');
    let Authtoken = '';
    if(token !=null && token !='' && token !=undefined){
        Authtoken = token;
    }
    const config = {
      headers: { 'XAuthorization': `Bearer ${Authtoken}` }
    };
    return config;

  }

const client = axios.create({
    baseURL: constant.API_URL,
  });

  export class ApiService {


vendorloginPostRequest(request) {
  return client.post(vendorloginUrl, request)
}

vendordataPostRequest(request) {
  return client.post(vendordataUrl, request, getauthtoken())
}

gigsdataRequest() {
  return client.get(getgigsdataUrl, getauthtoken())
}

addgigsdataPostRequest(request) {
  return client.post(addgigsUrl,request ,  getauthtoken())
}

gigsvendorcatdataRequest() {
  return client.get(getvendorcatdataUrl, getauthtoken())
}
getvendorsubcatdata(request) {
  return client.post(getvendorsubcatdataUrl, request, getauthtoken())
}

deletegigdata(request) {
  return client.post(deletegigdataUrl, request, getauthtoken())
}
getgigsdatabyid(request) {
  return client.post(getgigsdatabyidUrl, request, getauthtoken())
}
getallvendorsubcatdataRequest() {
  return client.get(getallvendorsubcatdataUrl, getauthtoken())
}
updatevendordata(request) {
  return client.post(updatevendordataUrl, request, getauthtoken())
}
vendordashboarddata(request) {
  return client.post(vendordashboarddataUrl, request, getauthtoken())
}
addvendorstripedata(request) {
  return client.post(addvendorstripedataUrl, request, getauthtoken())
}

addvendorstripebankdata(request) {
  return client.post(addvendorstripebankdataUrl, request, getauthtoken())
}

  getvendorbankdataRequest() {
  return client.get(getvendorbankdataurl, getauthtoken())
}
deletevendorstripebankdata(request) {
  return client.post(deletevendorstripebankdataurl, request, getauthtoken())
}
checkvendoraccountstripe() {
  return client.get(checkvendoraccountstripeUrl, getauthtoken())
}
checkuserbankexists() {
  return client.get(checkuserbankexistsUrl, getauthtoken())
}
membershippayment(request) {
  return client.post(membershippaymentUrl, request, getauthtoken())
}
expiremembership(request) {
  return client.post(expiremembershipUrl, request, getauthtoken())
}
showallusermessage(request) {
  return client.post(showallusermessageUrl, request,getauthtoken())
}
getchatdatabyid(request) {
  return client.post(getchatdatabyidUrl, request, getauthtoken())
}
sendmessage(request) {
  return client.post(sendmessageUrl, request, getauthtoken())
}
getvendororderdataRequest() {
  return client.get(getvendororderUrl, getauthtoken())
}
makeanoffer(request) {
  return client.post(makeanofferUrl, request, getauthtoken())
}
totalpaymentreceiveddataRequest() {
  return client.get(totalpaymentreceivedUrl, getauthtoken())
}
setprimaryaccount(request) {
  return client.post(setprimaryaccountUrl, request, getauthtoken())
}
orderstatus(request) {
  return client.post(orderstatusUrl, request, getauthtoken())
}
deletegigimage(request) {
  return client.post(deletegigimageUrl, request, getauthtoken())
}
getstatesdataGetRequest() {
  return client.get(getstatesdataUrl, getauthtoken())
}
getnotificationdataGetRequest() {
  return client.get(getnotificationdataUrl, getauthtoken())
}
unreadmessagenotification(request) {
  return client.post(unreadmessagenotificationUrl, request, getauthtoken())
}
getVendorSiteDataGetRequest() {
  return client.get(getVendorSiteDataUrl, getauthtoken())
}
}
