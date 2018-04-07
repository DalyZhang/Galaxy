-- 第一志愿情况查询语句
SELECT
    CASE `first`
    WHEN 1 THEN '编辑部'
    WHEN 2 THEN '综合管理部'
    WHEN 3 THEN '综合新闻部'
    WHEN 4 THEN '外联部'
    WHEN 5 THEN '策划推广部'
    WHEN 6 THEN '节目部'
    WHEN 7 THEN '人力资源部'
    WHEN 8 THEN '技术部'
    WHEN 9 THEN '视频部'
    WHEN 10 THEN '视觉设计部'
    END AS '部门',
    sum(`gender` = 1) AS '男生人数',
    sum(`gender` = 2) AS '女生人数',
    sum(1) AS '总人数'
FROM
    `app_form`
GROUP BY
    `first`;
