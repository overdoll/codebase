/**
 * @generated SignedSource<<2316efd26c07b17e76d50993c8e9cb29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModerationRemovePostFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ModerationRemovePostFormFragment";
};
export type ModerationRemovePostFormFragment$key = {
  readonly " $data"?: ModerationRemovePostFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ModerationRemovePostFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModerationRemovePostFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "81670a1582a6d3371f5b9274d86c0c05";

export default node;
