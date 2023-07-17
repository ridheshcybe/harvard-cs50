#include <cs50.h>
#include <stdio.h>

float average(int len, int array[]);

const int N = 3;

int main(void)
{
    int scores[N];
    for (int i = 0; i < N; i++)
    {
        scores[i] = get_int("Score: ");
    }

    printf("Average: %f\n", average(N, scores));
}

float average(int len, int array[])
{
    int sum = 0;
    for (int i = 0; i < len; i++)
    {
        sum += array[i];
    }

    return sum / 3.0;
}