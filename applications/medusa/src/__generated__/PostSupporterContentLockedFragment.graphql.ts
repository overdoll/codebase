/**
 * @generated SignedSource<<39061f75aa9e4281ca9ce6513dc6f645>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedButtonFragment">;
  readonly " $fragmentType": "PostSupporterContentLockedFragment";
};
export type PostSupporterContentLockedFragment$key = {
  readonly " $data"?: PostSupporterContentLockedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentLockedFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSupporterContentLockedButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "915edbbea7ffdda957a9d5a4115fa9db";

export default node;
