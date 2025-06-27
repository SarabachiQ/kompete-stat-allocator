:e ++enc=shift_jis
:w ++enc=utf-8 output.md
:qfile -i output.md:e ++enc=shift_jis:w ++enc=utf-8 output.md
