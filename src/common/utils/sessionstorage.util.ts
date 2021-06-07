import { Json, DictGroup, PacketInfo, Menu } from '../base'
import { ToolsUtil } from './tools.util'

export class SessionStorageUtil {
  static getLiveAddress () {
    const key = ToolsUtil.createCacheKey('LIVE_ADDRESS')
    const LiveAddress = sessionStorage.getItem(key)
    return LiveAddress || ''
  }

  static setLiveAddress (LiveAddress: string): void {
    const key = ToolsUtil.createCacheKey('LIVE_ADDRESS')
    sessionStorage.setItem(key, LiveAddress)
  }

  static putDictGroup (dictGroup: DictGroup): void {
    const str = sessionStorage.getItem('SCHOLAR_DictGroup_' + ToolsUtil.getOrgCode())
    let dicts: Json = {}
    if (str) {
      dicts = JSON.parse(str)
    }
    dicts[dictGroup.groupCode] = dictGroup
    if (dicts) {
      sessionStorage.setItem('SCHOLAR_DictGroup_' + ToolsUtil.getOrgCode(), JSON.stringify(dicts))
    }
  }

  static getDictGroupByCode (code: string) {
    const str = sessionStorage.getItem('SCHOLAR_DictGroup_' + ToolsUtil.getOrgCode())
    let dicts: Json = {}
    if (str) {
      dicts = JSON.parse(str)
    }
    if (dicts && Object.prototype.hasOwnProperty.call(dicts, code)) {
      return dicts[code]
    } else {
      return null
    }
  }

  static removeDictGroup () {
    sessionStorage.removeItem('SCHOLAR_DictGroup_' + ToolsUtil.getOrgCode())
  }

  static putCourseInfoItem (data: any) {
    const key = ToolsUtil.createCacheKey('courseProgress')
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  static getCourseInfoItem () {
    const key = ToolsUtil.createCacheKey('courseProgress')
    return sessionStorage.getItem(key)
  }

  static removeCourseInfoItem () {
    const key = ToolsUtil.createCacheKey('courseProgress')
    return sessionStorage.removeItem(key)
  }

  static putTikuTask (caterysTree: any) {
    const key = ToolsUtil.createCacheKey('tikuTask')
    sessionStorage.setItem(key, JSON.stringify(caterysTree))
  }

  static getTikuTask () {
    let caterysTree = null
    const key = ToolsUtil.createCacheKey('tikuTask')
    const str = sessionStorage.getItem(key)
    if (str) {
      caterysTree = JSON.parse(str)
    }
    if (caterysTree && caterysTree != null) {
      return caterysTree
    }
    return null
  }

  static removeTikuTask () {
    const key = ToolsUtil.createCacheKey('tikuTask')
    sessionStorage.removeItem(key)
  }

  static putMenus (menus: Menu[]): void {
    sessionStorage.setItem('SCHOLAR_MENUS_' + ToolsUtil.getOrgCode(), JSON.stringify(menus))
  }

  static getMenus (): Menu[] {
    const str = sessionStorage.getItem('SCHOLAR_MENUS_' + ToolsUtil.getOrgCode())
    if (str) {
      const menus: Menu[] = JSON.parse(str)
      return menus
    } else {
      return []
    }
  }

  static removeMenus () {
    sessionStorage.removeItem('SCHOLAR_MENUS_' + ToolsUtil.getOrgCode())
  }

  static putPacketInfoInner (packetInfo: { id: string | undefined; name: string | undefined; status: string | undefined; teachType: string | undefined; createrId: string | undefined; professionId: string | undefined; code: string | undefined; isSmart: string; auditStatus: string; lessonCount: string; courseId: string | undefined; isUsed: '0' | '1' | '2' | undefined; preview: string; curProgress: string; pcode: string | undefined; majorLeaderId: string | undefined; knowledgeSubjectId: string | undefined; isCard: string | boolean | undefined; is99Train: string | boolean | undefined; isBet: string | boolean | undefined; }): void {
    sessionStorage.setItem('SCHOLAR_PACKET_' + ToolsUtil.getOrgCode(), JSON.stringify(packetInfo))
  }

  static putPacketInfo (item: PacketInfo, preview?: boolean): void {
    const lessonCount = item.lessonCount ? item.lessonCount : '1'
    const isSmart = item.isSmart ? item.isSmart : '0'
    const auditStatus = item.auditStatus ? item.auditStatus : '0'
    const {
      id, name, status, teachType, createrId, pcode, majorId, courseId,
      courseCode, code, majorLeaderId, knowledgeSubjectId, isCard, is99Train, isBet, isUsed
    } = item
    this.putPacketInfoInner({
      id,
      name,
      status,
      teachType,
      createrId,
      professionId: majorId,
      code: courseCode || code,
      isSmart,
      auditStatus,
      lessonCount,
      courseId,
      isUsed,
      preview: preview ? '1' : '0',
      curProgress: '0',
      pcode,
      majorLeaderId,
      knowledgeSubjectId,
      isCard,
      is99Train,
      isBet
    })
  }

  static getPacketInfo () {
    const str = sessionStorage.getItem('SCHOLAR_PACKET_' + ToolsUtil.getOrgCode())
    if (str) {
      const packetInfo = JSON.parse(str)
      return packetInfo
    } else {
      return {}
    }
  }

  static putReadtree (value: string) {
    sessionStorage.setItem('SCHOLAR_READTREE_' + ToolsUtil.getOrgCode(), value)
  }

  static getReadtree () {
    return sessionStorage.getItem('SCHOLAR_READTREE_' + ToolsUtil.getOrgCode())
  }

  static removeReadtree () {
    sessionStorage.removeItem('SCHOLAR_READTREE_' + ToolsUtil.getOrgCode())
  }

  static putCasetree (value: string) {
    sessionStorage.setItem('SCHOLAR_CASETREE_' + ToolsUtil.getOrgCode(), value)
  }

  static getCasetree () {
    return sessionStorage.getItem('SCHOLAR_CASETREE_' + ToolsUtil.getOrgCode())
  }

  static removeCasetree () {
    sessionStorage.removeItem('SCHOLAR_CASETREE_' + ToolsUtil.getOrgCode())
  }

  static putTrainTree (code: string) {
    sessionStorage.setItem('SCHOLAR_TRAINTREE_' + ToolsUtil.getOrgCode(), code)
  }

  static getTrainTree () {
    return sessionStorage.getItem('SCHOLAR_TRAINTREE_' + ToolsUtil.getOrgCode())
  }

  static removeTrainTree () {
    sessionStorage.removeItem('SCHOLAR_TRAINTREE_' + ToolsUtil.getOrgCode())
  }

  static putPacketInfoItem (key: string | number, value: any) {
    const packetInfo = this.getPacketInfo()
    packetInfo[key] = value
    this.putPacketInfoInner(packetInfo)
  }

  static getPacketInfoItem (key: string | number) {
    const str = sessionStorage.getItem('SCHOLAR_PACKET_' + ToolsUtil.getOrgCode())
    if (str) {
      const packetInfo = JSON.parse(str)[key]
      return packetInfo || ''
    } else {
      return ''
    }
  }

  static removePacketInfo () {
    sessionStorage.removeItem('SCHOLAR_PACKET_' + ToolsUtil.getOrgCode())
  }

  static putSearch (key: string, CourseSearch: any): void {
    sessionStorage.setItem('SCHOLAR_' + key + ToolsUtil.getOrgCode(), JSON.stringify(CourseSearch))
  }

  static getSearch (key: string): any {
    const obj = sessionStorage.getItem('SCHOLAR_' + key + ToolsUtil.getOrgCode())
    if (obj) {
      const result = JSON.parse(obj)
      return result
    } else {
      return {}
    }
  }

  static clearSearch (key: string): void {
    sessionStorage.removeItem('SCHOLAR_' + key + ToolsUtil.getOrgCode())
  }

  // 保存调用素材数据
  static putScpResourceMaterial (info: Json): void {
    sessionStorage.removeItem('SCHOLAR_ScpResourceMaterial_' + ToolsUtil.getOrgCode())
    if (info) {
      sessionStorage.setItem('SCHOLAR_ScpResourceMaterial_' + ToolsUtil.getOrgCode(), JSON.stringify(info))
    }
  }

  static getScpResourceMaterial (): any {
    const str = sessionStorage.getItem('SCHOLAR_ScpResourceMaterial_' + ToolsUtil.getOrgCode())
    let info: Json = {}
    if (str) {
      info = JSON.parse(str)
    }
    return info
  }

  static removeScpResourceMaterial (): void {
    sessionStorage.removeItem('SCHOLAR_ScpResourceMaterial_' + ToolsUtil.getOrgCode())
  }

  static clearChapterSelection () {
    sessionStorage.removeItem('SCHOLAR_currentChapterId' + ToolsUtil.getOrgCode())
    sessionStorage.removeItem('SCHOLAR_currentSession' + ToolsUtil.getOrgCode())
  }

  static getChapter () {
    return sessionStorage.getItem('SCHOLAR_currentChapterId' + ToolsUtil.getOrgCode())
  }

  static setChapter (val: string) {
    sessionStorage.setItem('SCHOLAR_currentChapterId' + ToolsUtil.getOrgCode(), val)
  }

  static getSelection () {
    return sessionStorage.getItem('SCHOLAR_currentSession' + ToolsUtil.getOrgCode())
  }

  static setSelection (val: any) {
    sessionStorage.setItem('SCHOLAR_currentSession' + ToolsUtil.getOrgCode(), JSON.stringify(val))
  }

  static putKnowledgeGraphTab (knowledgeGraphTab: string) {
    sessionStorage.setItem('SCHOLAR_knowledgeGraphTab_' + ToolsUtil.getOrgCode(), knowledgeGraphTab)
  }

  static getKnowledgeGraphTab () {
    return sessionStorage.getItem('SCHOLAR_knowledgeGraphTab_' + ToolsUtil.getOrgCode())
  }

  static removeKnowledgeGraphTab () {
    sessionStorage.removeItem('SCHOLAR_knowledgeGraphTab_' + ToolsUtil.getOrgCode())
  }

  static putCourseType (courseType: string) {
    sessionStorage.setItem('SCHOLAR_courseType_' + ToolsUtil.getOrgCode(), courseType)
  }

  static getCourseType () {
    return sessionStorage.getItem('SCHOLAR_courseType_' + ToolsUtil.getOrgCode())
  }

  static removeCourseType () {
    sessionStorage.removeItem('SCHOLAR_courseType_' + ToolsUtil.getOrgCode())
  }

  static putCourseName (courseName: string) {
    sessionStorage.setItem('SCHOLAR_COURSE_NAME_' + ToolsUtil.getOrgCode(), courseName)
  }

  static getCourseName () {
    return sessionStorage.getItem('SCHOLAR_COURSE_NAME_' + ToolsUtil.getOrgCode())
  }

  static removeCourseName () {
    sessionStorage.removeItem('SCHOLAR_COURSE_NAME_' + ToolsUtil.getOrgCode())
  }

  static putSelectdCourse (selectdCourse: string) {
    sessionStorage.setItem('SCHOLAR_SELECTD_COURSE_' + ToolsUtil.getOrgCode(), selectdCourse)
  }

  static getSelectdCourse () {
    return sessionStorage.getItem('SCHOLAR_SELECTD_COURSE_' + ToolsUtil.getOrgCode())
  }

  static removeSelectdCourse () {
    sessionStorage.removeItem('SCHOLAR_SELECTD_COURSE_' + ToolsUtil.getOrgCode())
  }

  static putPageInfo (_PAGE_ID_: string, knowledgeSubjectId: string) {
    sessionStorage.setItem('SCHOLAR_' + _PAGE_ID_ + 'PageInfo' + ToolsUtil.getOrgCode(), knowledgeSubjectId)
  }

  static removePageInfo (_PAGE_ID_: string) {
    sessionStorage.removeItem('SCHOLAR_' + _PAGE_ID_ + 'PageInfo' + ToolsUtil.getOrgCode())
  }

  static getSubmodule () {
    return sessionStorage.getItem('SCHOLAR_SUBMODULE' + ToolsUtil.getOrgCode())
  }

  static putSubmodule (submodule: string) {
    sessionStorage.setItem('SCHOLAR_SUBMODULE' + ToolsUtil.getOrgCode(), submodule)
  }

  static removeSubmodule () {
    sessionStorage.removeItem('SCHOLAR_SUBMODULE' + ToolsUtil.getOrgCode())
  }

  static clear () {
    SessionStorageUtil.removeScpResourceMaterial()
    SessionStorageUtil.removePacketInfo()
    SessionStorageUtil.removeMenus()
    SessionStorageUtil.removeTikuTask()
    SessionStorageUtil.removeCourseInfoItem()
    SessionStorageUtil.removeDictGroup()
    SessionStorageUtil.clearChapterSelection()
    SessionStorageUtil.removeCourseType()
    SessionStorageUtil.removeKnowledgeGraphTab()
    SessionStorageUtil.removeCourseName()
    SessionStorageUtil.removeSelectdCourse()
    SessionStorageUtil.removeSubmodule()
    SessionStorageUtil.removeReadtree()
    SessionStorageUtil.removeCasetree()
    SessionStorageUtil.removeTrainTree()
  }
}
