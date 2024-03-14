#include <cs50.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    char *s = get_string("i: ");
    char *t = get_string("j: ");

    // from string.h
    if (strcmp(s, t) == 0)
    {
        printf("same \n");
    }
    else
    {
        printf("Different \n");
    }
};