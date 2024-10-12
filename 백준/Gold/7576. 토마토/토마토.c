#include <stdio.h>
#include <stdlib.h>

#define MAX 1000

int a, b;
int tomato[MAX][MAX];
int x_lst[4] = {0, 0, 1, -1};
int y_lst[4] = {1, -1, 0, 0};

// 큐 구조체 정의
typedef struct {
    int x, y;
} Point;

Point queue[MAX * MAX];
int front = 0, rear = 0;

// 큐에 삽입
void enqueue(int x, int y) {
    queue[rear].x = x;
    queue[rear].y = y;
    rear++;
}

// 큐에서 제거
Point dequeue() {
    return queue[front++];
}

// 큐가 비었는지 확인
int isEmpty() {
    return front == rear;
}

// BFS 함수
void bfs() {
    while (!isEmpty()) {
        Point p = dequeue();
        int x = p.x, y = p.y;

        for (int i = 0; i < 4; i++) {
            int new_x = x + x_lst[i];
            int new_y = y + y_lst[i];

            if (new_x < 0 || new_x >= b || new_y < 0 || new_y >= a) continue;
            if (tomato[new_x][new_y] == 0) {
                tomato[new_x][new_y] = tomato[x][y] + 1;
                enqueue(new_x, new_y);
            }
        }
    }
}

int main() {
    // 입력 받기
    scanf("%d %d", &a, &b);

    for (int i = 0; i < b; i++) {
        for (int j = 0; j < a; j++) {
            scanf("%d", &tomato[i][j]);
            if (tomato[i][j] == 1) {
                enqueue(i, j);  // 익은 토마토 위치를 큐에 저장
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
            if (tomato[i][j] > ans) {
                ans = tomato[i][j];
            }
        }
        if (ans == -1) break;
    }

    if (ans == -1) {
        printf("%d\n", ans);
    } else {
        printf("%d\n", ans - 1);  // 첫 익은 토마토의 값이 1이므로 1을 빼줌
    }

    return 0;
}
