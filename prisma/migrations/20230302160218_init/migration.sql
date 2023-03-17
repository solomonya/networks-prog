-- CreateTable
CREATE TABLE "Listener" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startedTime" DATETIME NOT NULL,
    "finishTime" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ListenerToReport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ListenerToReport_A_fkey" FOREIGN KEY ("A") REFERENCES "Listener" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ListenerToReport_B_fkey" FOREIGN KEY ("B") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ReportToSpeaker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ReportToSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReportToSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "Speaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AreaToReport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AreaToReport_A_fkey" FOREIGN KEY ("A") REFERENCES "Area" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AreaToReport_B_fkey" FOREIGN KEY ("B") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Listener_email_key" ON "Listener"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ListenerToReport_AB_unique" ON "_ListenerToReport"("A", "B");

-- CreateIndex
CREATE INDEX "_ListenerToReport_B_index" ON "_ListenerToReport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReportToSpeaker_AB_unique" ON "_ReportToSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_ReportToSpeaker_B_index" ON "_ReportToSpeaker"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AreaToReport_AB_unique" ON "_AreaToReport"("A", "B");

-- CreateIndex
CREATE INDEX "_AreaToReport_B_index" ON "_AreaToReport"("B");
