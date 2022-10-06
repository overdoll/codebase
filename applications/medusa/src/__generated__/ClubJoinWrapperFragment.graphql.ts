/**
 * @generated SignedSource<<a0d4f7c203db6f87ccb56fbf4bd57473>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinWrapperFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubJoinWrapperFragment";
};
export type ClubJoinWrapperFragment$key = {
  readonly " $data"?: ClubJoinWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinWrapperFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "eeafd67f604400879eb4d4d30e42d201";

export default node;
