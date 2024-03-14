#include <cs50.h>
#include <stdio.h>

int main(void)
{
    string s = "HI!";
    // show me address of s
    printf("%p\n", s);
    // tell me what the s[0] address is
    printf("%p\n", &s[0]);
    printf("%p\n", &s[1]);
    printf("%p\n", &s[2]);
    printf("%p\n", &s[3]);
};