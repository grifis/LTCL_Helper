<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Student;
use App\Image;
use App\Info;
use App\Weather;
use App\College;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReactController extends Controller
{
    
    /** 質問関連 */
    
    /**
     * 質問検索結果の受け渡し
     * 「絞り込み」と「フリーワード」両方に対応
     */
    public function getSearchQuestions(Request $request)
    {
        return Question::conditionSearch(
            // 絞り込み検索用
            $request->category, $request->topic, $request->curriculum_number, $request->keyword, 
            // キーワード検索用
            $request->searchType, urldecode($request->freeword));
    }
    
    /**
     * 全質問受け渡し
     */
    public function getAllQuestions()
    {
        return Question::All();
    }
    
    /**
     * 個別質問データの受け渡し
     */
    public function getQuestion(Question $question)
    {
        return $question;
    }
    
    /**
     * 公開中の個別質問データの受け渡し
     */
    public function getCheckedQuestion(Question $question)
    {
        if($question->check == true){
            return $question;
        }
        return null;
    }
    
    /**
     * 公開中の全質問受け渡し
     */
    public function getCheckedQuestions()
    {
        return Question::where('check', true)->get();
    }
    
    // /**
    //  * 未承認質問受け渡し
    //  */
    // public function getUnapprovedQuestions()
    // {
    //     return Question::where('check', false)->get();
    // }
    
    /**
     * カリキュラム範囲の全質問受け渡し
     */
    public function getCurriculumQuestions()
    {
        return Question::where('category', 0)->get();
    }
    
    /**
     * 成果物範囲の全質問受け渡し
     */
    public function getPortfolioQuestions()
    {
        return Question::where('category', 1)->get();
    }
    
    /**
     * 質問に関連する全画像の受け渡し
     */
    public function getImages($question_id)
    {
        return Image::where('question_id', $question_id)->get();
    }
    
    /** 
     * 個別記事に関連する全質問受け渡し
     */
    public function getRelatedQuestions(Document $document)
    {
        return $document->questions()->get();
    }
    
    
    
    
    /** 参考記事関連 */
    
    /**
     * 全記事受け渡し
     */
    public function getAlldocuments()
    {
        return Document::All();
    }
    
    /**
     * 個別記事データの受け渡し
     */
    public function getDocument(Document $document)
    {
        return $document;
    }
    
    /**
     * 個別質問に関連する全記事受け渡し
     */
    public function getRelatedDocuments(Question $question)
    {
        return $question->documents()->get();
    }
    
    
    
    /** ユーザ関連 */
    
    /**
     * 全管理者受け渡し
     */
    public function getAllStaffs()
    {
        return User::where('is_admin','staff')->get();
    }
    
    /**
     * 全受講生受け渡し
     */
    public function getAllStudents()
    {
        return Student::orderBy('password', 'asc')->get();
    }
    
    
    
    /** ログインユーザー情報 */

    /**
     * ログインユーザーid受け渡し
     */
    public function getUserId()
    {
        return Auth::id();
    }
    
    /**
     * ログインユーザデータ受け渡し
     */
    public function getUser()
    {
        return Auth::user();
    }
    
    
    
    /** home画面関連 */
    
    /**
     * 今日の天気のデータ受け渡し
     */
    public function getWeather()
    {
        return Weather::getWeatherData();
    }
    
    
    /**
     * URLで指定された日付の校舎情報受け渡し
     * 'react/college/{year}/{month}/{date}'
     */
    public function getCollegeData($year, $month, $date)
    {
        return College::getCollegeData($year, $month, $date);
    }
    
    
    /**
     * 記録されているお知らせの受け渡し
     */
    public function getInfos(Info $info)
    {
        // infosテーブルの全日付を取得（重複はなし）
        $infos['dates'] = $info->groupBy('date')->orderBy('date', 'desc')->pluck('date');
        
        // 各日付のデータを取得して配列に代入
        foreach($infos['dates'] as $date){
            $infos['infos'][$date] = $info->where('date', $date)->select('id', 'information')->get();
        }
        
        return $infos;
    }
    
    
    /**
     * Google Map APIのAPIキーの受け渡し
     */
    public function getMapApiKey()
    {
        return env('GoogleMapsKey');
    }
}
