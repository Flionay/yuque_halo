from flask import Flask, request, jsonify
import os
import requests


REQUEST_ID_HEADER = 'x-fc-request-id'

app = Flask(__name__)

GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')

@app.route('/yuque/webhook', methods=['GET', 'POST'])
def yuque_webhook():
    if request.method == 'GET':
        user = request.args.get('user')
        repo = request.args.get('repo')
        event_type = request.args.get('event_type')
    else:
        user = request.args.get('user')
        repo = request.args.get('repo')
        event_type = request.args.get('event_type')
    token = GITHUB_TOKEN
    print(user, repo, event_type)

    if not all([user, repo, event_type]):
        return jsonify({"message": "Missing required parameters"}), 400

    headers = {
        "User-Agent": "@elog/serverless-api",
        "Accept": "*/*",
        "Authorization": f"token {token}"
    }

    try:
        response = requests.post(
            f"https://api.github.com/repos/{user}/{repo}/dispatches",
            json={"event_type": event_type},
            headers=headers
        )
       
        return jsonify({"message": 'Success!'}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 401
    return jsonify({"message": "Success!"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9000)
