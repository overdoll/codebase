/**
 * @generated SignedSource<<b5b41e39adea0fe75760024446d4742e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaCreatePostClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerCreatePostClubFragment">;
  readonly " $fragmentType": "MetaCreatePostClubFragment";
};
export type MetaCreatePostClubFragment$key = {
  readonly " $data"?: MetaCreatePostClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaCreatePostClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaCreatePostClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerCreatePostClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "845af609d35a9a098731669010489485";

export default node;
