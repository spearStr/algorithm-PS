import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // a, b 입력 받기
        int a = scanner.nextInt(); // 열
        int b = scanner.nextInt(); // 행
        
        // 2차원 배열 tomato 입력 받기
        int[][] tomato = new int[b][a];
        for (int i = 0; i < b; i++) {
            for (int j = 0; j < a; j++) {
                tomato[i][j] = scanner.nextInt();
            }
        }
        
        // 방향 설정 (상, 하, 좌, 우)
        int[] x_lst = {0, 0, 1, -1};
        int[] y_lst = {1, -1, 0, 0};
        
        // Deque (BFS 큐 역할)
        Deque<int[]> deq = new ArrayDeque<>();
        
        // 익은 토마토 위치 큐에 추가
        for (int i = 0; i < b; i++) {
            for (int j = 0; j < a; j++) {
                if (tomato[i][j] == 1) {
                    deq.add(new int[]{i, j});
                }
            }
        }
        
        // BFS 탐색
        bfs(tomato, deq, x_lst, y_lst, b, a);
        
        // 결과 계산
        int ans = 0;
        for (int i = 0; i < b; i++) {
            for (int j = 0; j < a; j++) {
                if (tomato[i][j] == 0) {
                    ans = -1;  // 익지 않은 토마토가 있으면 -1
                    break;
                }
                ans = Math.max(ans, tomato[i][j]);
            }
            if (ans == -1) break;  // 이미 익지 않은 토마토가 발견되면 중단
        }
        
        // 결과 출력
        if (ans == -1) {
            System.out.println(ans);
        } else {
            System.out.println(ans - 1);  // 처음 익은 토마토의 값이 1이므로 최종 값에서 1을 뺌
        }
    }
    
    // BFS 메서드
    public static void bfs(int[][] tomato, Deque<int[]> deq, int[] x_lst, int[] y_lst, int b, int a) {
        while (!deq.isEmpty()) {
            int[] pos = deq.poll();  // 큐에서 좌표 꺼내기
            int x = pos[0], y = pos[1];
            
            // 상, 하, 좌, 우 방향으로 탐색
            for (int i = 0; i < 4; i++) {
                int new_x = x + x_lst[i];
                int new_y = y + y_lst[i];
                
                // 범위를 벗어나면 패스
                if (new_x < 0 || new_x >= b || new_y < 0 || new_y >= a) continue;
                
                // 익지 않은 토마토(값이 0)일 때만 처리
                if (tomato[new_x][new_y] == 0) {
                    tomato[new_x][new_y] = tomato[x][y] + 1;  // 익히기
                    deq.add(new int[]{new_x, new_y});  // 새 좌표를 큐에 추가
                }
            }
        }
    }
}
