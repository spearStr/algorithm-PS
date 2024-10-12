#include <iostream>
#include <vector>
#include <deque>
#include <algorithm>

using namespace std;

int a, b;
vector<vector<int>> tomato;
deque<pair<int, int>> deq;

// 방향 벡터 (상, 하, 좌, 우)
int x_lst[4] = {0, 0, 1, -1};
int y_lst[4] = {1, -1, 0, 0};

// BFS 함수
void bfs() {
    while (!deq.empty()) {
        int x = deq.front().first;
        int y = deq.front().second;
        deq.pop_front();

        for (int i = 0; i < 4; i++) {
            int new_x = x + x_lst[i];
            int new_y = y + y_lst[i];

            if (new_x < 0 || new_x >= b || new_y < 0 || new_y >= a) continue;
            if (tomato[new_x][new_y] == 0) {
                tomato[new_x][new_y] = tomato[x][y] + 1;
                deq.push_back({new_x, new_y});
            }
        }
    }
}

int main() {
    // 입력 받기
    cin >> a >> b;
    tomato.resize(b, vector<int>(a));

    for (int i = 0; i < b; i++) {
        for (int j = 0; j < a; j++) {
            cin >> tomato[i][j];
            if (tomato[i][j] == 1) {
                deq.push_back({i, j});
            }
        }
    }

    // BFS 탐색
    bfs();

    // 결과 계산
    int ans = 0;
    for (int i = 0; i < b; i++) {
        for (int j = 0; j < a; j++) {
            if (tomato[i][j] == 0) {
                ans = -1;
                break;
            }
            ans = max(ans, tomato[i][j]);
        }
        if (ans == -1) break;
    }

    if (ans == -1) {
        cout << ans << endl;
    } else {
        cout << ans - 1 << endl;
    }

    return 0;
}
