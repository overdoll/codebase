/**
 * @generated SignedSource<<930bbac04db6466eac7f1b90620affbe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSupportClubFragment$data = {
  readonly name: string;
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  readonly " $fragmentType": "ContainerSupportClubFragment";
};
export type ContainerSupportClubFragment$key = {
  readonly " $data"?: ContainerSupportClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSupportClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSupportClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "0d95c7868e31ab925ea085d1df243179";

export default node;
