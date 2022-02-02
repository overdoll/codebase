/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AudiencesCurationStepFragment = {
    readonly audience: {
        readonly audiences: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
        }>;
    };
    readonly " $refType": "AudiencesCurationStepFragment";
};
export type AudiencesCurationStepFragment$data = AudiencesCurationStepFragment;
export type AudiencesCurationStepFragment$key = {
    readonly " $data"?: AudiencesCurationStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AudiencesCurationStepFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudiencesCurationStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AudienceCurationProfile",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Audience",
          "kind": "LinkedField",
          "name": "audiences",
          "plural": true,
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
              "name": "title",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CurationProfile",
  "abstractKey": null
};
(node as any).hash = '84261a46a3756d00db27fc0661a1ef9f';
export default node;
