/**
 * @generated SignedSource<<d7381e004ba6ffbd91408a0417453519>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceStandardFormFragment$data = {
  readonly id: string;
  readonly standard: boolean;
  readonly " $fragmentType": "ChangeAudienceStandardFormFragment";
};
export type ChangeAudienceStandardFormFragment = ChangeAudienceStandardFormFragment$data;
export type ChangeAudienceStandardFormFragment$key = {
  readonly " $data"?: ChangeAudienceStandardFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceStandardFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceStandardFormFragment",
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
      "name": "standard",
      "storageKey": null
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "a2c2cbe2d3d6dbdcd59fa490e64fd43f";

export default node;
