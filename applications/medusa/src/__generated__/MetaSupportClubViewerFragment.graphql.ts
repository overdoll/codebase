/**
 * @generated SignedSource<<4c5b3d0fd834c88bd7b53d01f1395fd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSupportClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSupportClubViewerFragment">;
  readonly " $fragmentType": "MetaSupportClubViewerFragment";
};
export type MetaSupportClubViewerFragment$key = {
  readonly " $data"?: MetaSupportClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSupportClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSupportClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSupportClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "f8aa17d3d0f4319a83146a8aaf4655c6";

export default node;
