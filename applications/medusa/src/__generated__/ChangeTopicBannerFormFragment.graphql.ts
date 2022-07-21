/**
 * @generated SignedSource<<75f004ae9936f0a4bf872d62d4acf51c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicBannerFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeTopicBannerFormFragment";
};
export type ChangeTopicBannerFormFragment$key = {
  readonly " $data"?: ChangeTopicBannerFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicBannerFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicBannerFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "9f7d26f951ce22a636475d78fb71c7f0";

export default node;
