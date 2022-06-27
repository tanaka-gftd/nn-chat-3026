/* ダークモード設定用ファイル */

//ローカルストレージに値を保存する時のキー（ライトモード時にtrueがセットされる）
const localStorageKey = 'isLightmode';

//HTMLから、bodyタグ、textareaタグ、"card my-3"が適用されている要素を取得
/* ダークモードとライトモードの切り替えは、ここで取得した要素にBootStrapクラスを割り当てることで行う */
const bodyElement = document.body;
const textareaElement = document.querySelector('textarea');
const userPosts = document.getElementsByClassName('card my-3');

//ローカルストレージから、キーを使って対応する値を取得する関数
//ローカルストレージから取得した値は文字列なので、文字列のtrueと比較することで、擬似的にboolean型に変換している
function getValue() {
  const result = localStorage.getItem(localStorageKey);
  return result === 'true';
}

//他ユーザーの投稿した投稿の背景色を切り替える
function updateUserPosts(isLightmode) {

  //ダークモード用スタイル
  const darkmodeStyle = "card my-3 bg-secondary text-white";

  //ライトモード用スタイル
  const lightmodeStyle = "card my-3";

  //投稿の数だけ、スタイル設定を繰り返す
  for(let i = 0; i < userPosts.length; i++){
    if(userPosts[i].className === darkmodeStyle && isLightmode) {
      userPosts[i].className = lightmodeStyle;
    } else if ( userPosts[i].className === lightmodeStyle && !isLightmode) {
      userPosts[i].className = darkmodeStyle;
    }
  }
}

//bodyタグとtextareaタグの、ダークモード用のタイル
function setDarkmode() {
  bodyElement.className = "container bg-dark text-white";
  textareaElement.className =  "form-control bg-secondary text-white";
}

//bodyタグとtextareaタグの、ライトモード用のタイル
function setLightmode() {
  bodyElement.className = "container";
  textareaElement.className =  "form-control";
}

//ダークモードとライトモードを切り替える処理
//切り替えはisLightmodeの値で管理し、切り替え時にはローカルストレージ内のisLightmodeの値も反転させる
function toggle() {
  const isLightmode = getValue();
  localStorage.setItem(localStorageKey, !isLightmode);
  if(isLightmode){
    setDarkmode();
  } else {
    setLightmode();
  }
  updateUserPosts(!isLightmode);
}

//ダークモード時にリロードした際、ダークモードが維持される用にするための関数
/* 
  ダークモードのときにリロードされた場合は、LocalStorageの値はダークモード状態を示すfalseのまま
  よって、LocalStorageの値がfalseになっていれば、強制的にダークモードにする。
*/
function init() {
  if(!getValue()){
    updateUserPosts(false);  // updateUserPosts関数の引数はisLightmodeの値
    setDarkmode();
  }
}