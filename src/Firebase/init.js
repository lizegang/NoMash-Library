import { initializeApp } from "firebase/app";
// （可选）如果需要 Firestore，导入并初始化（根据需求添加）
import { getFirestore } from "firebase/firestore";

// Firebase 配置（从 main.js 迁移过来）
const firebaseConfig = {
 apiKey: "AIzaSyDyOq9XJbNSifIw9Ywh6_bD9duXxhOFLRA",
authDomain: "week5-lizegang.firebaseapp.com",
 projectId: "week5-lizegang",
 storageBucket: "week5-lizegang.firebasestorage.app",
 messagingSenderId: "185509771105",
 appId: "1:185509771105:web:5ea138a13d2024c0f63720"
};


// 初始化 Firebase 应用
const firebaseApp = initializeApp(firebaseConfig);

// （可选）初始化 Firestore（如果需要使用数据库，取消注释以下代码）
const db = getFirestore(firebaseApp);

// 导出 Firebase 实例和 Firestore 实例（供其他组件导入使用）
export { firebaseApp, db };
