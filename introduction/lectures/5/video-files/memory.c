#include <stdio.h>
#include <stdlib.h>

// lets make a int array using malloc
int main(void)
{
    // size of tells the byte size of a data type
    int *x = malloc(3 * sizeof(int));
    x[0] = 72;
    x[1] = 73;
    x[2] = 33;
    x[3] = '\0';
}