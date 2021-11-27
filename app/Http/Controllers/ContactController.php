<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Slack;

class ContactController extends Controller
{
    /**
     * お問い合わせ送信処理
     */
    public function sendContactMessage(Request $request)
    {
        $user = Auth::user()->name;
        
        $message = $user . "さんから次のような問い合わせがありました。\n----------------\n" . $request['message'] . "\n----------------";
        
        Slack::sendMessage($message);
    }
    
    /**
     * お問い合わせ入力画面表示
     */
    // public function create()
    // {
    //     return view('Public.Contact.create');
    // }
}
