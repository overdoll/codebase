/**
 * @generated SignedSource<<6e92ae29559b0cf5d3482cc42ceb6e0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicBannerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicBannerFormFragment" | "TopicIconFragment">;
  readonly " $fragmentType": "ChangeTopicBannerFragment";
};
export type ChangeTopicBannerFragment$key = {
  readonly " $data"?: ChangeTopicBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicBannerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TopicIconFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeTopicBannerFormFragment"
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "583098692dbce1a66e6a27a71e504fa4";

export default node;
